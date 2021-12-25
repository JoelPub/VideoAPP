package com.shj.code.service;


import com.shj.code.util.TkMapper;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import tk.mybatis.mapper.entity.Example;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

/**
 * BaseService
 *
 * @author steve
 */

public abstract class TkServiceImpl<M extends TkMapper<T>, T> implements TkService<T> {

    @Autowired
    @Getter
    protected M mapper;

    private final Class<T> persistentClass;

    public TkServiceImpl() {
        this.persistentClass = (Class<T>) getSuperClassGenricType(getClass(), 1);
    }

    public M getMapper() {
        return this.mapper;
    }

    @Override
    public T selectOne(T entity) {
        return mapper.selectOne(entity);
    }

    @Override
    public T selectById(Object id) {
        return mapper.selectByPrimaryKey(id);
    }

    @Override
    public List<T> selectList(T entity) {
        return mapper.select(entity);
    }

    @Override
    public List<T> selectListAll() {
        return mapper.selectAll();
    }

    @Override
    public Long selectCount(T entity) {
        return (long) mapper.selectCount(entity);
    }

    @Override
    public void insert(T entity) {
        mapper.insert(entity);
    }

    @Override
    public void insertSelective(T entity) {
        mapper.insertSelective(entity);
    }

    @Override
    public void delete(T entity) {
        mapper.delete(entity);
    }

    @Override
    public void deleteById(Object id) {
        mapper.deleteByPrimaryKey(id);
    }

    @Override
    public void updateById(T entity) {
        mapper.updateByPrimaryKey(entity);
    }

    @Override
    public void updateSelectiveById(T entity) {
        mapper.updateByPrimaryKeySelective(entity);
    }


    protected Example createExample() {
        return new Example(persistentClass, true, true);
    }

    public static Class<Object> getSuperClassGenricType(final Class clazz, final int index) {

        //返回表示此 Class 所表示的实体（类、接口、基本类型或 void）的直接超类的 Type。
        Type genType = clazz.getGenericSuperclass();

        if (!(genType instanceof ParameterizedType)) {
            genType = clazz.getSuperclass().getGenericSuperclass();
            if (!(genType instanceof ParameterizedType)) {
                return Object.class;
            }
        }
        //返回表示此类型实际类型参数的 Type 对象的数组。
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();

        if (index >= params.length || index < 0) {
            return Object.class;
        }
        if (!(params[index] instanceof Class)) {
            return Object.class;
        }
        return (Class) params[index];
    }
}